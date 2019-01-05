import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';

export class Editor extends Component {
    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        });
    }
    render() {
        if (this.props.note) {
            return (
                <div>
                    <input
                        value={this.props.note.title}
                        placeholder='Untitled Note'
                        onChange={e => {
                            this.props.call('notes.update', this.props.note._id, {
                                title: e.target.value
                            });
                        }}
                    />
                    <textarea value={this.props.note.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)} />
                    <button>Delete</button>
                </div>
            );
        } else {
            return <p>{this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}</p>;
        }
    }
}
Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object
};

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
})(Editor);
