const PATH_ICON = './assets/images/icon/';

const getFileIcon = type => {
  	
	let icon = PATH_ICON;

	if ([".png", ".jpeg", ".jpg", ".gif"].includes(type)) {
		icon += "picture.png";
	} else if (type.includes(".zip") || type.includes(".rar")) {
		icon += "zip.png";
	} else if (type.includes(".ppt")) {
		icon += "ppt.png";
	} else if (type.includes(".doc")) {
		icon += "doc.png";
	} else if (type.includes(".xls")) {
		icon += "xls.png";
	} else if (type.includes(".csv")) {
		icon += "csv.png";
	} else if (type.includes(".pdf")) {
		icon += "pdf.png";
	} else if (type.includes(".txt")) {
		icon += "txt.png";
	} else icon += "file.png";
  	return icon;
};

export default getFileIcon;
