import React, { useContext, useEffect, useState } from "react";
import CardWithImage from "../../components/Cards/CardWithImage";
import Image from '../../utils/images.js'
import axios from 'axios';
import axiosInstance from "../../services/api/axiosInstance.js";

const CommunityPage = () => {
    const communityCards = ["dummy"];

    const [communityData, setCommunityData] = useState([])
    const [communityLoading, setCommunityLoading] = useState(false);

    const [modalApiContent, setModalApiContent] = useState([])


    // Get Community Content
    useEffect(() => {
        setCommunityLoading(false);
        const getcommunityDatas = async () => {
            try {
                const response = await axiosInstance.get("/professional_community")

                if (response.data.error_code === 0) {
                    setCommunityLoading(true)
                    setCommunityData(response.data.data)
                    getModalData(response.data.data[0].id)
                }
            }

            catch (err) {
                console.log(err)
            }
        }
        (async () => getcommunityDatas())();

    }, [])


    // Post Community Modal Content
    const getModalData = async (modalId) => {
        let communityParams = {
            id: modalId
        }
        try {
            const response = await axiosInstance.post("/get_detailed_description_community", communityParams)

            setModalApiContent(response.data.data[0].detailed_description)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div className="community-page-height community-page-bg overflow-scroll">
                <div className="container pt-5" >
                    {communityLoading ?
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-0 mb-4">
                            {communityData.map((value, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <CardWithImage cardImage={value.image}
                                            cardTitle={value.title}
                                            cardTitleStyle="communityTitle"
                                            imageClassName="rounded-4 img-fluid community-img-height"
                                            cardText={value.short_description}
                                            cardKey={index}
                                            carTextClassName="role-selection-description"
                                            cardParaTestId="professionalTestId"
                                            cardButtonTestId="cardButton"
                                            role="learningAndCommunity"
                                            firstButton_Name="Join Community"
                                            secondButton_Name="Share"
                                            firstCardColor="brand-color"
                                            secondCardColor="outline-secondary"
                                            modalContent={modalApiContent}
                                            leftCommUrl={value.join_url}
                                            rightCommUrl={value.share_url}
                                            getModalData={getModalData}
                                            modalId={value.id}
                                        />

                                    </div>
                                )
                            })}

                        </div>
                        :
                        communityCards.map((v, i) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4" key={i}>
                                    <div
                                        className="card border-0 p-0 rounded-3 overflow-hidden placeholder-glow"
                                        aria-hidden="true"
                                        key={i}
                                    >
                                        <div className="col-12">
                                            <span className="placeholder col-12 py-4 rounded-top"></span>
                                            <span className="placeholder col-12 py-4"></span>
                                            <span className="placeholder col-12 py-4"></span>
                                            <span className="placeholder col-12 py-4 rounded-bottom"></span>
                                        </div>
                                        <div className="card-body p-0">
                                            <div className="p-3 py-5">
                                                <h5 className="card-title ">
                                                    <span className="placeholder col-6 py-3 rounded-3"></span>
                                                </h5>
                                                <p className="card-text">
                                                    <span className="placeholder col-12 py-2 rounded "></span>
                                                    <span className="placeholder col-12 py-2 rounded"></span>
                                                    <span className="placeholder col-12 py-2 rounded"></span>
                                                    <span className="placeholder col-8 py-2 rounded"></span>
                                                </p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <button className="btn btn-outline-secondary placeholder col-5"></button>
                                                <button className="btn btn-outline-secondary placeholder col-5"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default CommunityPage

