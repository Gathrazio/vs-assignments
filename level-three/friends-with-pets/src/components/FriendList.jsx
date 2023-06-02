import React from 'react'
import friends from '../friends'
import Friend from './Friend'

export default function FriendList () {
    const friendCards = friends.map(friend => <Friend key={friend.id} {...friend}/>);
    return (
        <div className="friend-list">
            {friendCards}
        </div>
    )
}