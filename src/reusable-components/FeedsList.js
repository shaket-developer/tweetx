import React from 'react';

const FeedsList = (props) => {
    const { userId, name, profile_image, feed, time } = props.data
    return (
        <>
            <div className="p-0 mb-5 bg-white feed-detail pb-4 pt-4">
                
                <div className="feed-top d-md-flex flex-sm-column flex-md-row text-center text-md-left">
                    <div className="feed-image col-md-auto">
                        <img src={profile_image} className="rounded-circle" />
                    </div>
                    <div className="feed-basic-detail flex-grow-1 d-md-flex">
                        <h5 className="align-self-center">{name}</h5>
                        <small className="ml-auto align-self-end">{time}</small>
                    </div>
                    <div className="col-md-auto d-none d-md-block">
                    </div>
                </div>

                <div className="feed-text d-flex align-items-center text-center text-md-left">
                    <div className="feed-empty col-md-auto d-none d-md-block">
                        
                    </div>
                    <div className="feed-basic-detail flex-grow-1 d-flex">
                        <p className="align-self-center mb-0">{feed}</p>
                    </div>
                    <div className="col-md-auto p-0 d-none d-md-block">
                        <div className="rotated-half-circle rotated-half-circle ml-auto">
                        </div>
                    </div>
                </div>
                    
            </div>
        </>
    )
}
export default FeedsList;