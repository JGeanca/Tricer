export const SuccessModal = ({ handleCloseModal }) => {
  return (
    <div
      className="modal fade show"
      style={{ display: 'block' }}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Success</h5>
          </div>
          <div className="modal-body">
            Your payment has been processed successfully!
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}