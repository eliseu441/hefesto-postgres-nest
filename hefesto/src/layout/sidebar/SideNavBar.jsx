import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import vivo from './logo_nav.png';


function useOutsideAlerter(ref, isExpanded) {

	useEffect(() => {


		function subMenuFibraOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				if (isExpanded) {
					var checkbox = document.querySelector("#checkbox-menu")
					checkbox.click()
				}
			}
		}
		document.addEventListener("mousedown", subMenuFibraOutside);
		return () => {
			document.removeEventListener("mousedown", subMenuFibraOutside);
		};
	}, [ref, isExpanded]);
}



const SideNavBar = (ref) => {
	const [isExpanded, setExpendState] = useState(false);
	const [showSubFibra, setShowSubFibra] = useState(false);
	const [showSubEQP, setShowSubEQP] = useState(false);
	const [showSubLegado, setShowSubLegado] = useState(false);

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, isExpanded);
	const ExpansionPanelDetails = () => {
		if (isExpanded == false) {
			var checkbox = document.querySelector("#checkbox-menu")
			checkbox.classList.add('active');
			setExpendState(true)
		}
	}
	const ExpansionReduceDetails = () => {
		if (isExpanded == true) {
			var checkbox = document.querySelector("#checkbox-menu")
			checkbox.classList.remove('active');
			setExpendState(false)
		}
	}
	const subMenuFibra = () => {
		setShowSubFibra(!showSubFibra);

	}
	const subMenuEQP = () => {
		setShowSubEQP(!showSubEQP);

	}
	const subMenuLegado = () => {
		setShowSubLegado(!showSubLegado);

	}
	const removeChecked = () => {
		setShowSubFibra(false);
		setShowSubEQP(false);
		setShowSubLegado(false);


	}
	return (
		<div ref={wrapperRef}
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper" onMouseLeave={() => ExpansionReduceDetails()} onMouseOver={() => ExpansionPanelDetails()}>
				<div className="nav-heading"
				>
					{isExpanded && (
						<div >
							<span><img src={vivo} className="img-nav"/></span>
						</div>
					)}
					<input type="checkbox" id="checkbox-menu" />
					<label for="checkbox-menu">
						<span></span>
						<span></span>
						<span></span>
					</label>
				</div>
				<div className="nav-menu">
					<div class="list-group">
						<Link to="/" className="decoration" onClick={e => removeChecked()} >
							<span class="list-group-item list-group-item-action " ><span class="text-margin sidebarHover"><i class="bi bi-reception-4 fs-2 icons-color "></i>{isExpanded && (
								<span class='sidebarHover' style={{ marginLeft: "10px" }}> Fluxo</span>
							)} </span></span>
						</Link>
						<Link to="/" className="decoration" onClick={e => removeChecked()} >
							<span class="list-group-item list-group-item-action " ><span class="text-margin sidebarHover"><i class="bi bi-pie-chart-fill fs-3 icons-color "></i>{isExpanded && (
								<span class='sidebarHover' style={{ marginLeft: "10px" }}> Dashboard</span>
							)} </span></span>
						</Link>
						<Link to="/CreateProduct" className="decoration" onClick={e => removeChecked()} >
							<span class="list-group-item list-group-item-action " ><span class="text-margin sidebarHover"><i class="bi bi-plus-square-fill fs-3 icons-color "></i>{isExpanded && (
								<span class='sidebarHover' style={{ marginLeft: "10px" }}> Create Product</span>
							)} </span></span>
						</Link>
						<div>
							<span class="list-group-item list-group-item-action dropdown-toggle" onClick={subMenuFibra}><span class="text-margin sidebarHover"><i class="bi bi-telephone-outbound-fill fs-5 icons-color"></i>{isExpanded && (
								<span style={{ marginLeft: "10px" }}> Contato</span>
							)} </span></span>
						</div>
						{showSubFibra && (
							<div class='transitionDown'>
								<div class="list-group">
									<Link to="https://www.linkedin.com/in/eliseu-caetano-da-silva-68a272186/" className="decoration" onClick={e => removeChecked()}>
										<span class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i class="bi bi-linkedin fs-6 icons-color sub-menu"></i>{isExpanded && (
											<span style={{ marginLeft: "20px" }}>Linkedin</span>
										)} </span></span>
									</Link>
								</div>	
								<div class="list-group">
									<Link to="https://github.com/eliseu441/" className="decoration" onClick={e => removeChecked()}>
										<span class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i class="bi bi-github fs-6 icons-color sub-menu"></i>{isExpanded && (
											<span style={{ marginLeft: "20px" }}>Github</span>
										)} </span></span>
									</Link>
								</div>
								<div class="list-group" style={{display: "none"}}>
									<Link to="/editMassivo" className="decoration" onClick={e => removeChecked()}>
										<span class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i style={{ WebkitTextStroke: "0.3px", marginLeft: "3px" }} class="bi bi-card-checklist fs-5 icons-color sub-menu"></i>{isExpanded && (
											<span style={{ marginLeft: "20px" }}>Editar Massivo</span>
										)} </span></span>
									</Link>
								</div>


							</div>
						)}
						</div>
				</div>
			</div>
		</div>
	);
};

export default SideNavBar;
