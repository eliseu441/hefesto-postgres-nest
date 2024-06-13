
export const baseStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '5px', 
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	transition: 'border .3s ease-in-out'
};

export const activeStyle = {
	borderColor: '#2196f3'
};

export const acceptStyle = {
	borderColor: '#00e676'
};

export const rejectStyle = {
	borderColor: '#ff1744'
};

export const thumbsContainer = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	marginTop: 16,
};

export const thumb = {
	display: "inline-flex",
	borderRadius: 2,
	border: "1px solid #eaeaea",
	marginBottom: 8,
	marginRight: 8,
	width: 60,
	height: 60,
	padding: 4,
	boxSizing: "border-box",
};

export const thumbInner = {
	display: "flex",
	minWidth: 0,
	overflow: "hidden",
};

export const img = {
	display: "block",
	width: "auto",
	height: "100%",
};
