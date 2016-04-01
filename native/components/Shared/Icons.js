import React from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const OpenDoor = (props) => (
  <Icon name="happy-outline" size={ props.styles.size } color={ props.styles.color } />
);

OpenDoor.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export const ClosedDoor = (props) => (
  <Icon name="ios-close-empty" size={ props.styles.size } color={ props.styles.color } />
);

ClosedDoor.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export const SettingsGear = (props) => (
  <Icon name="ios-gear-outline" size={props.style.size} color={props.style.color} />
);

SettingsGear.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const List = (props) => (
  <Icon name="ios-list-outline" size={props.style.size} color={props.style.color} />
);

List.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const LeftArrow = (props) => (
  <Icon name="ios-arrow-thin-left" size={props.style.size} color={props.style.color} />
);

LeftArrow.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const RightArrow = (props) => (
  <Icon name="ios-arrow-thin-right" size={props.style.size} color={props.style.color} />
);

RightArrow.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const XIcon = (props) => (
  <Icon name="ios-close-empty"
    size={props.style.size}
    color={props.style.color}
  />
);

XIcon.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const Plus = (props) => (
  <Icon name="ios-plus-empty" size={props.style.size} color={props.style.color} />
);

Plus.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const PersonAdd = (props) => (
  <Icon name="ios-personadd"
    size={props.style.size}
    color={props.style.color}
  />
);

PersonAdd.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const PersonAddOutline = (props) => (
  <Icon name="ios-personadd-outline" size={props.style.size} color={props.style.color} style={{ marginTop: 30 }}/>
);

PersonAddOutline.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const GroupsOutline = (props) => (
  <Icon name="ios-people-outline" size={props.style.size} color={props.style.color} style={{ marginTop: 30 }}/>
);

GroupsOutline.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const Edit = (props) => (
  <Icon name="edit"
    size={props.style.size}
    color={props.style.color}
  />
);

Edit.propTypes = {
  style: React.PropTypes.object.isRequired,
};

export const Person = (props) => (
 <Icon name="ios-person-outline"
   size={props.style.size}
   color={props.style.color}
 />
);

Person.propTypes = {
 style: React.PropTypes.object.isRequired,
};

export const People = (props) => (
 <Icon name="ios-people-outline"
   size={props.style.size}
   color={props.style.color}
   style={{paddingBottom: 100}}
 />
);

People.propTypes = {
 style: React.PropTypes.object.isRequired,
};

