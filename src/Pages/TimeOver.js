import React from "react";
import logo from "../Assets/cover.png";
import InstagramSVG from "../Assets/instagramSVG";
import FacebookSVG from "../Assets/facebookSVG";

function TimeOver() {
    return (
        <div className="h-screen mx-auto flex flex-col justify-center items-center text-center gap-4 p-8">
            <div className="flex justify-around">
                <img src={logo} alt="Caravan" className="w-1/2"/>
                <div className="flex flex-col gap-2 justify-around items-center w-1/6">
                    <a href="https://www.instagram.com/caravankz.nl/" target="_blank" rel="noreferrer">
                        <InstagramSVG color="white" size="100%"/>
                    </a>
                    <a href="https://www.facebook.com/carbidploegfeankleaster" target="_blank" rel="noreferrer">
                        <FacebookSVG color="white" size="100%"/>
                    </a>
                </div>
            </div>
            <h1 className="text-4xl">De stembussen zijn gesloten!</h1>
            <p className="text-lg">Er kan niet meer gestemd worden, de uitslag wordt op 31 december bekend gemaakt bij
                het carbid schieten in Feankleaster.</p>
        </div>
    );
}

export default TimeOver;