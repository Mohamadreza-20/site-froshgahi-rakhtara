export function compressImageToDataUrl(file, options = {}) {
	const { maxWidth = 1600, maxHeight = 1600, quality = 0.82 } = options;

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(new Error("خطا در خواندن تصویر"));
		reader.onload = () => {
			const image = new Image();
			image.onerror = () => reject(new Error("خطا در پردازش تصویر"));
			image.onload = () => {
				const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
				const canvas = document.createElement("canvas");
				canvas.width = Math.max(1, Math.round(image.width * scale));
				canvas.height = Math.max(1, Math.round(image.height * scale));
				const context = canvas.getContext("2d");
				if (!context) {
					reject(new Error("امکان پردازش تصویر وجود ندارد"));
					return;
				}
				context.drawImage(image, 0, 0, canvas.width, canvas.height);
				resolve(canvas.toDataURL("image/webp", quality));
			};
			image.src = reader.result;
		};
		reader.readAsDataURL(file);
	});
}
