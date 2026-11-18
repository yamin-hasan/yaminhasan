
(() => {
 const form=document.querySelector('#visibility-form');if(!form)return;
 const status=document.querySelector('.form-status'),submit=form.querySelector('[type=submit]');
 form.addEventListener('submit',async e=>{
  e.preventDefault();status.className='form-status';status.textContent='';
  if(!form.reportValidity())return;
  const original=submit.textContent;submit.disabled=true;submit.textContent='Sending request…';
  try{
   const data=Object.fromEntries(new FormData(form).entries());
   const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
   const result=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(result.error||'Your request could not be sent. Please try again later.');
   status.className='form-status success show';status.setAttribute('role','status');status.textContent='Thank you. Your request has been received.';
   form.reset();
  }catch(err){status.className='form-status error show';status.setAttribute('role','alert');status.textContent=err.message||'Something went wrong. Please try again.';}
  finally{submit.disabled=false;submit.textContent=original;}
 });
})();
