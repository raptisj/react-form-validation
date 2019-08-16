import React from 'react';

const Message = ({isShow}) => {
    return (
        <div>
            {isShow ? <h3 className="error-msg">Hell no son, this ain't valid</h3> : <h3></h3>}
        </div>
    )
}

export default Message;