import HOC from "."
const ProfileContainer = (ProfileScreen) => {
  class HOC extends Component {
    render() {
      const {
        props,
      } = this;

      return (
        <ProfileScreen
          {...props}
        />
      );
    }
  }

  return HOC;
};

ProfileContainer.navigationOptions = { // these are not being applied
  header: {
    right: <Text>Test</Text>
  },
};

export default ProfileContainer;