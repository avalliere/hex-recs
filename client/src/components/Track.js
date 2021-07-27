const Track = (rec) => {
  const recId = rec.rec.id;
  const url = `https://open.spotify.com/embed/track/${recId}`;

  return (
    <iframe
      title={recId}
      src={url}
      width="100%"
      height="100"
      frameBorder="0"
      allowtransparency="true"
      encrypted-media="*"
    ></iframe>
  );
};

export default Track;
