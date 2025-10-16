import React from "react";
import PropTypes from "prop-types"; // Runtime type checking for props
import styles from "./Team.module.css"; // CSS modules for component styling

// Import all team member images as modules for webpack bundling
import abbyImage from "../../img/exec-team/abby.JPG";
import cmacImage from "../../img/exec-team/cmac.jpg";
import henryImage from "../../img/exec-team/henry.jpg";
import julianImage from "../../img/exec-team/julian2.jpg";
import livImage from "../../img/exec-team/liv.jpg";


// Map JSON image paths to imported image modules
const imageMap = {
  "/img/exec-team/abby.JPG": abbyImage,
  "/img/exec-team/cmac.jpg": cmacImage,
  "/img/exec-team/henry.jpg": henryImage,
  "/img/exec-team/julian2.jpg": julianImage,
  "/img/exec-team/liv.jpg": livImage,
};

export default function TeamMemberCard({ member }) {
  // Get the imported image module or fallback to original path
  const member_image = imageMap[member.image] || member.image;
  
  return (
    <div className={styles.teamMember}> {/* Team member card container */}
      <img src={member_image} alt={member.name} /> {/* Member photo */}
      <h3>{member.name}</h3> {/* Member name */}
      <p>{member.role}</p> {/* Member role/position */}
    </div>
  );
}

// PropTypes for runtime type checking and documentation
TeamMemberCard.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Unique identifier
    name: PropTypes.string.isRequired, // Member's full name
    role: PropTypes.string.isRequired, // Member's position/role
    image: PropTypes.string.isRequired, // Image path from JSON
  }).isRequired,
};