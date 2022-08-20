import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import HTMLReactParse from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFLIM } from 'utilities/constants';
export default function ConfilmModel({titile, content,show,onAction}) {
    
 return (
        <Modal
         show={show}
          onHide={()=>onAction('close')}
          backdrop='static'
          keyboard={false}
          animation={false}
          >
            <Modal.Header closeButton>
                <Modal.Title className='h5'>{HTMLReactParse(titile)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParse(content)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>onAction(MODAL_ACTION_CLOSE)}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>onAction(MODAL_ACTION_CONFLIM)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}