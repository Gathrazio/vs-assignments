import React from 'react'
import BadgeHeader from './BadgeHeader'

export default function Badge (props) {
    const thisBadge = props.badge;
    const styles = {
        backgroundColor: thisBadge.index % 2 === 0 ? "red" : "blue"
    }
    return (
        <div className="wrapper">
            <BadgeHeader styles={styles}/>
            <div className="badge--pseudo-form">
                <div className="interface--first-name interface badge-text">Name: {thisBadge.firstName} {thisBadge.lastName}</div>
                <div className="interface--email interface badge-text">Email: {thisBadge.email}</div>
                <div className="interface--POB interface badge-text">Place of Birth: {thisBadge.pOB}</div>
                <div className="interface--phone interface badge-text">Phone: {thisBadge.phone.slice(0,3)}-{thisBadge.phone.slice(3,6)}-{thisBadge.phone.slice(6)}</div>
                <div className="interface--fav-food interface badge-text">Favorite Food: {thisBadge.favFood}</div>
                <div className="interface--self-digest badge-version badge-text" >{thisBadge.selfDigest}</div>
            </div>
        </div>
    )
}