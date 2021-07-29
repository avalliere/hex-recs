const Track = (rec) => {
  const recId = rec.rec.id;
  const url = `https://open.spotify.com/embed/track/${recId}`;

  return (
    <div style={{ margin: '20px 0' }}>
      <iframe
        title={recId}
        src={url}
        width="100%"
        height="75"
        frameBorder="0"
        allowtransparency="true"
        encrypted-media="*"
      ></iframe>
    </div>
  );
};

export default Track;
