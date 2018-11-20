class Post {
	constructor() {
		//const dataURL = "https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info";
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
							<h3 class="mdc-typography--subtitle2">by Kurt Wagner</h3>
							<p class="mdc-typography--body2">${v.sub}</p>
						</a>
						<div class="mdc-card__actions">
							<div class="mdc-card__action-icons">
								<button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="favorite">favorite_border</button>
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