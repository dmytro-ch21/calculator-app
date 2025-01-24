function OperationHistory({history}) {
    return (
        <div className="history-box border border-1 p-3">
        <h5>History</h5>
        {history.length === 0 ? (
          <div className="text-muted">No operations yet</div>
        ) : (
          history.map((item, index) => (
            <div key={index} className="history-item">
              {item}
            </div>
          ))
        )}
      </div>
      );
}

export default OperationHistory
