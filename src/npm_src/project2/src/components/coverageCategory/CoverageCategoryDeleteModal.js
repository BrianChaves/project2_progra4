import React from 'react'
import RestService from '../../services/rest-service'
import AuthService from '../../services/auth-service';

function CoverageCategoryDeleteModal({currentUser, coverageCategoryData}) {
    const deleteCoverageCategory = (event) => {
        event.preventDefault();
        RestService.deleteObject(`coverage/category/${coverageCategoryData.id}/delete`)
            .then((data) => {
                console.log(data);

                window.location.replace('/coverageCategory/');
            })
    }
    return (
        <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">Delete Coverage Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5>Are you sure you want to delete {coverageCategoryData.name}'s profile?</h5>
                        <div className="text-danger text-center fw-bold p-1 mb-0 mt-3">*You will have to register again if the profile is deleted.</div>
                    </div>
                    <div className="modal-footer">
                        <form onSubmit={deleteCoverageCategory}>
                            <button type="submit" className="btn btn-danger">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoverageCategoryDeleteModal