import React from "react";
import CardWithImage from "../components/Cards/CardWithImage";
import Image from "../utils/images";
import { useNavigate } from "react-router-dom";

const RoleSelectionLayout = () => {
  const pageRender = useNavigate();
  return (
    <div className="col-12">
      <div className=" d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-11 mx-auto">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                  <CardWithImage
                    cardImage={Image.professional}
                    cardTitle="Professional"
                    cardText=" Empowering experienced semi-retired or retired
                    professionals with fulfilling opportunities"
                    carTextClassName="role-selection-descriptionbg"
                    cardParaTestId="professionalTestId"
                    cardButtonTestId="cardButton"
                    buttonName="Sign up"
                    pageRenderPath={() =>
                      pageRender("/role_selection/professional_signup/manual")
                    }
                    width={150}
                    height={150}
                    imageClassName={"mx-auto m-4 p-3"}
                    cardButtonId="professional-card"
                  />
                </div>
                <div className="col">
                  <CardWithImage
                    cardImage={Image.employer}
                    cardTitle="Employer"
                    cardText="Enabling enterprises, start-ups, and NGOs to find
                    well-screened experienced talent from a pool of
                    well-qualified semi-retired or retired professionals"
                    carTextClassName="role-selection-description"
                    cardParaTestId="employerTestId"
                    cardButtonTestId="cardSignupButton"
                    buttonName="Sign up"
                    pageRenderPath={() =>
                      pageRender("/role_selection/employer_signup/manual")
                    }
                    width={150}
                    height={150}
                    imageClassName={"mx-auto m-4 p-3"}
                    cardButtonId="employer-card"
                  />
                </div>
                <div className="col">
                  <CardWithImage
                    cardImage={Image.partner}
                    cardTitle="Partner"
                    cardText=" Engaging platform for recruiting firms, skills development  firms, and coaching firms to partner"
                    carTextClassName="role-selection-description"
                    cardParaTestId="partnerTestId"
                    buttonName="Sign up"
                    width={150}
                    height={150}
                    imageClassName={"mx-auto m-4 p-3"}
                    cardButtonId="partner-card"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionLayout;
