import { useNavigation } from 'react-router-dom';

export const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(navigation);

  return (
    <button
      className='btn btn-primary uppercase btn-block'
      type='submit'
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className='loading loading-spinner' />
          sending...
        </>
      ) : (
        text
      )}
    </button>
  );
};
