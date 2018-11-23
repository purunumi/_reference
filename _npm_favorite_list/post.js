import {MDCRipple} from '@material/ripple';
import {MDCIconButtonToggle} from '@material/icon-button';

class Post {
	constructor() {
		const dataURL = "/data/data.json";
		this.setInitData(dataURL);
	}

	setInitData(dataURL) {
		this.getData(dataURL, this.insertPosts);
	}

	getData(dataURL, fn) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", () => {
			//const list = JSON.parse(JSON.parse(oReq.responseText).body);
			const list = JSON.parse(oReq.responseText).body;
			fn(list);
		});
		oReq.open('GET', dataURL);
		oReq.send();

		oReq.addEventListener("loadend", function(){
			const arrA = document.querySelectorAll('.mdc-card__primary-action');
			arrA.forEach((o) => {
				const iconButtonRipple = new MDCRipple(o);
			});

			var arrB = document.querySelectorAll('.mdc-icon-button');
			// console.log(arrB);
			arrB.forEach((o) => {
				const iconButtonRipple = new MDCRipple(o);
				const toggleButton = new MDCIconButtonToggle(o);
			});
		});
	}

	insertPosts(list) {
		const ul = document.querySelector(".mdc-layout-grid__inner");
		let html = '';
		list.forEach((v) => {
			html += `
				<div class="mdc-layout-grid__cell">
					<!-- post-card -->
					<div class="mdc-card mdc-card--outlined post-card">
						<a href="${v.link}" class="mdc-card__primary-action">
							<h2 class="mdc-typography--headline6">${v.title}</h2>
							<h3 class="mdc-typography--subtitle2">by ${v.writer}</h3>
							<p class="mdc-typography--body2">${v.sub}</p>
						</a>
						<div class="mdc-card__actions">
							<div class="mdc-card__action-icons">
								<button
									class="mdc-icon-button"
									aria-label="Add to favorites"
									aria-hidden="true"
									aria-pressed="false">
									<i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
									<i class="material-icons mdc-icon-button__icon">favorite_border</i>
								</button>
							</div>
						</div>
					</div>
					<!-- //post-card -->
				</div>
			`;
		})
		ul.insertAdjacentHTML('beforeend', html);
	}
}

export default Post;