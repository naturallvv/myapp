import React, {useState} from "react";
import './ProfileCard.css';

function ProfileCard(props) {
    const{name, studentId, major} = props;
    const[likeCount, setLikeCount] = useState(0);
    const handleLike = () => {
        setLikeCount((c) => c+1);
    };

    const initial = name ? name[0] : '?';

    return (
        <div className="profile-card">
            <div className="avatar">{initial}</div>


            <div className="info">
                <div className="name">{name}</div>
                <div className="meta">
                    <span>학번: {studentId}</span>
                    
                    <span>전공: {major}</span>
                </div>


                <p className="intro">안녕하세요! React 컴포넌트를 배우고 있는 {name}입니다.</p>


                <div className="actions">
                    <button className="like-btn" onClick={handleLike}>좋아요</button>
                    <span className="like-count">좋아요 {likeCount}회</span>
                </div>
            </div>
        </div>
    );
}


export default ProfileCard;