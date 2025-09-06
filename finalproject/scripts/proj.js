// Date: 2023-10-05
// Description: Main JavaScript file for Gadget Cycle project
// Author: Ezra Zacarias

// -----------------------------
    // Sample data & utilities
    // -----------------------------
    const sampleListings = [
      {
        id:1,
        brand:'Apple',
        model:'iPhone 11',
        cond:'good',
        price:175,
        thumb:'📱',
        verified:true,
        added:'2025-07-05'
        },
      {
        id:2,
        brand:'Samsung',
        model:'Galaxy S10',
        cond:'like-new',
        price:210,
        thumb:'📱',
        verified:false,
        added:'2025-06-28'
      },
      {
        id:3,
        brand:'Dell',
        model:'XPS 13 (2018)',
        cond:'repair',
        price:320,
        thumb:'💻',
        verified:true,
        added:'2025-08-01'
      },
      {
        id:4,
        brand:'Sony',
        model:'Alpha A6000',
        cond:'good',
        price:280,
        thumb:'📷',
        verified:false,
        added:'2025-05-13'
      },
      {
        id:5,
        brand:'Apple',
        model:'iPad Air (3rd gen)',
        cond:'like-new',
        price:245,
        thumb:'📱',
        verified:true,
        added:'2025-07-20'
      },
      {
        id:6,
        brand:'Fitbit',
        model:'Versa 2',
        cond:'good',
        price:60,
        thumb:'⌚',
        verified:false,
        added:'2025-04-02'
      }
    ];

    const listingsEl = document.getElementById('listings');
    const filterBrand = document.getElementById('filterBrand');
    const filterCond = document.getElementById('filterCond');
    const sortBy = document.getElementById('sortBy');
    const globalSearch = document.getElementById('globalSearch');

    // populate brand filter
    const brands = Array.from(new Set(sampleListings.map(l=>l.brand))).sort();
    brands.forEach(b=>{const opt=document.createElement('option');opt.value=b;opt.textContent=b;filterBrand.appendChild(opt)});

    // render cards
    function renderListings(data){
      listingsEl.innerHTML='';
      data.forEach(item=>{
        const div=document.createElement('div');div.className='card';
        div.innerHTML = `
          <div class="thumb">${item.thumb}</div>
          <div style="margin-top:8px">
            <div class="meta"><div class="title">${item.brand} ${item.model}</div><div class="price">$${item.price}</div></div>
            <div class="tags"><div class="tag-pill">${item.cond.replace('-',' ')}</div>${item.verified?'<div class="tag-pill">Verified</div>':''}</div>
            <div class="actions"><button class="btn ghost" data-id="${item.id}">View</button><button class="btn primary" data-buy="${item.id}">Buy</button></div>
          </div>
        `;
        listingsEl.appendChild(div);
      })
    }

    // initial render
    renderListings(sampleListings);

    // filters
    function applyFilters(){
      const brand = filterBrand.value;
      const cond = filterCond.value;
      const sort = sortBy.value;
      const q = globalSearch.value.trim().toLowerCase();

      let out = sampleListings.filter(l=>{
        if(brand && l.brand !== brand) return false;
        if(cond && l.cond !== cond) return false;
        if(q && !(l.brand.toLowerCase().includes(q) || l.model.toLowerCase().includes(q))) return false;
        return true;
      });

      if(sort==='price-asc') out.sort((a,b)=>a.price-b.price);
      else if(sort==='price-desc') out.sort((a,b)=>b.price-a.price);
      else if(sort==='newest') out.sort((a,b)=> new Date(b.added) - new Date(a.added));

      renderListings(out);
    }

    filterBrand.addEventListener('change',applyFilters);
    filterCond.addEventListener('change',applyFilters);
    sortBy.addEventListener('change',applyFilters);
    globalSearch.addEventListener('input',()=>{setTimeout(applyFilters,150)});

    // estimator (very simple rule-of-thumb algorithm)
    document.getElementById('estimateBtn').addEventListener('click',()=>{
      const brand = document.getElementById('estBrand').value.trim();
      const model = document.getElementById('estModel').value.trim();
      const cond = document.getElementById('estCondition').value;
      if(!brand || !model){alert('Please enter brand and model');return}

      // base price heuristics
      let base = 80; // generic
      if(/iphone|ipad|apple/i.test(brand+model)) base = 260;
      if(/galaxy|samsung|pixel/i.test(brand+model)) base = 200;
      if(/xps|macbook|mac book|macbook pro|dell|hp|lenovo/i.test(brand+model)) base = 450;
      if(/alpha|canon|nikon|sony|leica|dslr/i.test(brand+model)) base = 350;

      let mult = cond==='like-new' ? 1.0 : cond==='good' ? 0.75 : 0.45;
      const est = Math.round(base * mult + (Math.random()*40 - 10));

      document.getElementById('estPrice').textContent = `$${est}`;
      const box = document.getElementById('estResult'); box.style.display='block';
    });

    // Sell modal
    const sellModal = document.getElementById('sellModal');
    document.getElementById('sellBtn').addEventListener('click',()=>{sellModal.style.display='flex';});
    document.getElementById('closeSell').addEventListener('click',()=>{sellModal.style.display='none';});
    document.getElementById('cancelSell').addEventListener('click',()=>{sellModal.style.display='none';});

    document.getElementById('submitSell').addEventListener('click',()=>{
      const brand = document.getElementById('sBrand').value.trim();
      const model = document.getElementById('sModel').value.trim();
      const cond = document.getElementById('sCondition').value;
      const price = parseFloat(document.getElementById('sPrice').value) || Math.round(Math.random()*200+50);
      if(!brand||!model){alert('Please add brand and model');return}
      const newItem = {id:Date.now(),brand,model,cond,price,thumb:'📦',verified:false,added:new Date().toISOString().slice(0,10)};
      sampleListings.unshift(newItem);
      // update brand filter if needed
      if(!brands.includes(brand)){brands.push(brand);const opt=document.createElement('option');opt.value=brand;opt.textContent=brand;filterBrand.appendChild(opt)}
      applyFilters();
      sellModal.style.display='none';
      alert('Listing published — good luck!');
    });

    // Quick Sell instant offer (scaffolding)
    document.getElementById('quickSell').addEventListener('click',()=>{
      document.getElementById('estBrand').value = '';
      document.getElementById('estModel').value = '';
      document.getElementById('estResult').style.display='none';
      sellModal.style.display='flex';
    });

    // buy button handler (demo)
    document.addEventListener('click',e=>{
      const buy = e.target.getAttribute('data-buy');
      if(buy){
        const item = sampleListings.find(x=>x.id==buy);
        if(item) alert(`🎉 You bought ${item.brand} ${item.model} for $${item.price} — (demo)`);
      }
    });

    // sign-in demo
    document.getElementById('signinBtn').addEventListener('click',()=>alert('Sign-in flow not implemented in demo.'));
