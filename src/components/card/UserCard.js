import React from 'react';

const UserCard = ({ user }) => {
	return (
		<div className="user-card">
			<img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
			<h2>{`${user.name.first} ${user.name.last}`}</h2>
			<p>Email: {user.email}</p>
			<p>Phone: {user.phone}</p>
			<p>Location: {`${user.location.city}, ${user.location.country}`}</p>
		</div>
	);
};

export default UserCard;
