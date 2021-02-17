(function(){
this.modal =  function(options={}){
	//varibels
		const DEFAULT_OPTIONS = {
			animationTime:500,
			scroll:false,
			closeBtn:true,
			openAnimationName:"animate__fadeInDownBig",
			closeAnimationName:"animate__fadeOutDownBig",
			absoluteClass:".fix-block",
			useAnimate:true,
			dataModal:false,
			modalHTML:`
					<div class="modal-title">
						<p>
							Title
						</p>
					</div>
					<div class="modal-body">
						This is body
					</div>
					<div class="modal-footer">
						This is footer
						<button>1</button>
						<button>2</button>
					</div>
				`,

		}
		const focusedElements = [
		 'a[href]',
	    'area[href]',
	    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
	    'select:not([disabled]):not([aria-hidden])',
	    'textarea:not([disabled]):not([aria-hidden])',
	    'button:not([disabled]):not([aria-hidden])',
	    'iframe',
	    'object',
	    'embed',
	    '[contenteditable]',
	    '[tabindex]:not([tabindex^="-"])'
		];
		let closed = true;
		let destroy = false;
	    const modalOptions = Object.assign(DEFAULT_OPTIONS,options);
	    let openBtn;
	    let focusArray;
		let closeBtn = modalOptions.closeBtn ? `<button  role="button" class="modal-btn--close"></button>` : "";
		let absoluteElems = document.querySelectorAll(modalOptions.absoluteClass);
		//end varibels
		formationDefaultHtml();
		modal.lastFocus = modal.lastFocus ? modal.lastFocus : focusArray[0];
		//check use animate.css
		if(modalOptions.useAnimate)
		{
			createLibAnimate();
		}
		//end check
		if(modalOptions.dataModal)
		{
			openBtn = document.querySelector(`[data-modal='${modalOptions.dataModal}']`);
			openBtn.addEventListener('click',defaultOpen);
		}
		defaultCheckClose();

		modal.prototype.open = function(){
			if(destroy){
				throw new Error('This modal has been destoryed');
			}
			else{
				if(closed)
				{
					modal.closeFocus = document.activeElement;
					modal.scrollFromTop = window.pageYOffset;
					modal.modalWindow.classList.add('open');
					modal.modalWindow.querySelector(".modal-content").classList.add(modalOptions.openAnimationName);
					modal.modalWindow.classList.add('open');
					elemsLock();
					modal.modalContent.classList.toggle(modalOptions.closeAnimationName,false);
					modal.modalContent.classList.add(modalOptions.openAnimationName);
					
					document.addEventListener('keydown',closeEsc);
					setTimeout(()=>{closed = false;focusTrap()},modalOptions.animationTime);
				}
			}
		};

		modal.prototype.close = function()
		{
			if(!closed && !destroy)
			{
				
				modal.modalWindow.classList.remove('open');
				modal.modalWindow.querySelector(".modal-content").classList.toggle(modalOptions.openAnimationName,false);
				modal.modalWindow.querySelector(".modal-content").classList.add(modalOptions.closeAnimationName);
				elemsUnLock();
				if(!focusArray.length == 0)
				{
					document.removeEventListener('keydown',stayFocus);
					modal.lastFocus = document.activeElement;
					setTimeout(()=>{modal.closeFocus.focus();window.scrollTo(0,modal.scrollFromTop);},modalOptions.animationTime);
				}
				else{
					return;
				}
			}
		}
		modal.prototype.destroy = function()
		{
			if(!closed)
			{
				elemsUnLock();
			}
			if(!destroy)
			{
				modal.modalWindow.parentNode.removeChild(modal.modalWindow);
				openBtn.removeEventListener('click',defaultOpen);
				document.removeEventListener('keydown',stayFocus);
				
				destroy = true;
			}
		}

		function formationDefaultHtml()
		{
			modalOptions.modalHTML = (options.modalHTML == (undefined || null)) ? modalOptions.modalHTML :options.modalHTML; 
			//formation html modal window
				modal.modalWindow = document.createElement('div');
				modal.modalWindow.classList.add('modal-overlay');
				modal.modalWindow.style.setProperty('--animate-duration', modalOptions.animationTime/1000 + "s");
			//end formation
			//formation html modal wrapper
				let modalWrapper = document.createElement('div');
				modalWrapper.classList.add('modal-overlay--wrapper');
				modal.modalWindow.appendChild(modalWrapper);
			//end formation
			//formation html modal content
				modal.modalContent = document.createElement('div');
				modal.modalContent.classList.add('modal-content');
				modal.modalContent.style.setProperty('--animate-duration', modalOptions.animationTime/1000 + "s");
				modal.modalContent.insertAdjacentHTML('afterbegin',closeBtn);
				modal.modalContent.insertAdjacentHTML('beforeend',modalOptions.modalHTML);
				modalWrapper.appendChild(modal.modalContent );
				document.body.insertAdjacentElement('afterbegin',modal.modalWindow);
			//end formation
			focusArray = Array.prototype.slice.call(modal.modalWindow.querySelectorAll(focusedElements));
		}

		function defaultOpen()
		{
			if(!destroy){
				modal.prototype.open()
			}
		}

		function elemsLock()
		{
				if(!modalOptions.scroll)
				{
					let scrollWidth = window.innerWidth - document.body.offsetWidth;
					document.body.style.paddingRight = scrollWidth+ 'px';
					document.body.classList.add('scroll-lock');
					absoluteElems.forEach(function(elem){
						elem.style.paddingRight =scrollWidth + 'px';
					})
				}
				else
				{
					if(existTop()){
					document.body.classList.add('scroll-off');
					document.body.style.top = '-' + modal.scrollFromTop + 'px';	
					}	
				}
		}

		function elemsUnLock()
		{
			if(!modalOptions.scroll)
				{
					setTimeout(()=>{
							document.body.style.paddingRight = '0px';
							document.body.classList.remove('scroll-lock');
							absoluteElems.forEach(function(elem){
								elem.style.paddingRight ='0px';
							})
							closed = true;
						}
					,modalOptions.animationTime);
				}
				else
				{
					setTimeout(()=>{
							document.body.classList.remove('scroll-off');
							document.body.style.top = "0px";
							closed = true;
						}
					,modalOptions.animationTime);
				}
		}

		function stayFocus(e)
		{
				if(e.keyCode == 9){
					const focusable = modal.modalWindow.querySelectorAll(focusedElements);
					if (!modal.modalWindow.contains(document.activeElement)) {
				        modal.lastFocus.focus();
				         e.preventDefault();
			   		 }else {
				        const focusedItemIndex = focusArray.indexOf(document.activeElement)
				        if (e.shiftKey && focusedItemIndex === 0) {
				            focusArray[focusArray.length - 1].focus();
				            e.preventDefault();
				        }
				        if (!e.shiftKey && focusedItemIndex === focusArray.length - 1) {
				            focusArray[0].focus();
				            e.preventDefault();
				        }
					}
				}

		}
		function focusTrap()
		{
			if(modal.lastFocus.tagName == "BODY"){
				focusArray[0].focus();
			}
			if(!modal.closed && focusArray.length !== 0){
				modal.lastFocus.focus();
				document.addEventListener('keydown',stayFocus);
			}
		}
		function rememberFocus()
		{
			modal.lastFocus = document.activeElement;
			if(focusArray.indexOf(modal.lastFocus) == -1)
			{
				modal.lastFocus = focusArray[0];
			}
		}

		function createLibAnimate()
		{
			let link = document.createElement('link');
			link.rel = "stylesheet";
			link.href = "app/animate.min.css";
			document.head.querySelector('title').insertAdjacentElement('afterend',link)
			modal.modalContent.classList.add('animate__animated');
		}
		function defaultCheckClose()
		{
			setTimeout(function(){document.addEventListener('click',function(e){
				if(e.target.classList.contains('modal-overlay--wrapper'))
				{
					modal.prototype.close();
				}
				if(modalOptions.closeBtn && e.target.classList.contains('modal-btn--close')){
					modal.prototype.close();
				}
			})},modalOptions.animationTime);
		}
		function closeEsc(e)
		{
			if(e.keyCode == 27){
				modal.prototype.close();
			}
		}

		function existTop()
		{
			return document.body.scrollHeight - document.body.clientHeight
		}
	
};
}());