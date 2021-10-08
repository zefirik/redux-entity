import React,{ memo} from "react";
import PropTypes from "prop-types";
import { ButtonToolbar,Button, Panel } from "rsuite";


const Comment = ({id, body, onDelete, onPatch}) => {

    return (
        <Panel header={id} bordered style={{margin: 20}}>
            {body}
            <ButtonToolbar style={{margin: 10}}>
                <Button size="lg" color="red" appearance="primary" onClick={() => onDelete(id)}>
                    Delete
                </Button>
                <Button size="lg" color="cyan" appearance="primary" onClick={() => onPatch(id, {body:'New Text'})}>
                    Patch
                </Button>
            </ButtonToolbar>
        </Panel>
    )
};

Comment.prototype = {
    onDelete: PropTypes.func.isRequired,
    onPatch: PropTypes.func.isRequired,
    comment: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
};

export default memo(Comment);