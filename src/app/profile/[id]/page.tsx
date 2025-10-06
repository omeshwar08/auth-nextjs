// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserProfile = ({ params }: any) => {
  return (
    <div>
      UserProfile
      <h1>{params.id}</h1>
    </div>
  );
};

export default UserProfile;
