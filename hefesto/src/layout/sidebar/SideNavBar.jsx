import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from './logo_nav_white.png';


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
	const [showSubFibra, setShowSubContact] = useState(false);
	const [showSubCreation, setShowSubCreation] = useState(false);
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
	const subMenu = (id) => {
		switch(id){
			case 1:
				setShowSubCreation(!showSubCreation);
				break;	
			case 2:
				setShowSubContact(!showSubFibra);
			  break;	
		  }
	}
	const subMenuEQP = () => {
		setShowSubEQP(!showSubEQP);

	}
	const subMenuLegado = () => {
		setShowSubLegado(!showSubLegado);

	}
	const removeChecked = () => {
		setShowSubContact(false);
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
					<input type="checkbox" id="checkbox-menu" />
					<label for="checkbox-menu">
						<span></span>
						<span></span>
						<span></span>
					</label>
					{isExpanded && (
						<div >
							<span><img src={logo} data-aos="zoom-in" data-aos-duration="800" className="img-nav"/></span>
						</div>
					)}
					
				</div>
				<div className="nav-menu">
					<div class="list-group">
						<Link to="/" className="decoration" onClick={e => removeChecked()} >
							<span class="list-group-item list-group-item-action " ><span class="text-margin sidebarHover"><i class="bi bi-pie-chart fs-4 icons-color "></i>{isExpanded && (
								<span data-aos="zoom-in" data-aos-duration="800" class='sidebarHover'  style={{ marginLeft: "10px" }}> Dashboard</span>
							)} </span></span>
						</Link>
						<div>
							<span class="list-group-item list-group-item-action dropdown-toggle" onClick={e => subMenu(1)}><span class="text-margin sidebarHover"><i class="bi bi-database-up fs-4 icons-color"></i>{isExpanded && (
								<span data-aos="zoom-in" data-aos-duration="800" style={{ marginLeft: "10px" }}>Workflow</span>
							)} </span></span>
						</div>
						{showSubCreation && (
							<div class='transitionDown'>
								<div class="list-group">
									<Link to="/CreateProduct" className="decoration" onClick={e => removeChecked()}>
										<span class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i class="bi bi-plus-square fs-6 icons-color sub-menu"></i>{isExpanded && (
											<span data-aos="zoom-in" data-aos-duration="800" style={{ marginLeft: "15px" }}>Criar produto</span>
										)} </span></span>
									</Link>
								</div>	
								<div class="list-group">
									<Link to="/CreateProcess" className="decoration" onClick={e => removeChecked()}>
										<span class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i class="bi bi-github fs-6 icons-color sub-menu"></i>{isExpanded && (
											<span data-aos="zoom-in" data-aos-duration="800" style={{ marginLeft: "15px" }}>Adicionar esteira</span>
										)} </span></span>
									</Link>
								</div>


							</div>
						)}
						<div>
							<span class="list-group-item list-group-item-action dropdown-toggle" onClick={e => subMenu(2)}><span class="text-margin sidebarHover"><i class="bi bi-telephone-outbound fs-5 icons-color"></i>{isExpanded && (
								<span data-aos="zoom-in" data-aos-duration="800" style={{ marginLeft: "10px" }}> Contato</span>
							)} </span></span>
						</div>
						{showSubFibra && (
							<div class='transitionDown' >
								<div class="list-group">
									<Link to="https://www.linkedin.com/in/eliseu-caetano-da-silva-68a272186/" className="decoration" onClick={e => removeChecked()}>
										<span data-aos="zoom-in" data-aos-duration="800" class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i class="bi bi-linkedin fs-6 icons-color sub-menu"></i>{isExpanded && (
											<span style={{ marginLeft: "15px" }}>Linkedin</span>
										)} </span></span>
									</Link>
								</div>	
								<div class="list-group">
									<Link to="https://github.com/eliseu441/" className="decoration" onClick={e => removeChecked()}>
										<span data-aos="zoom-in" data-aos-duration="800" class="list-group-item list-group-item-action"><span class="text-margin sidebarHover"><i class="bi bi-github fs-6 icons-color sub-menu"></i>{isExpanded && (
											<span style={{ marginLeft: "15px" }}>Github</span>
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
