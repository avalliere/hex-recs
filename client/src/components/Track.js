const Track = (rec) => {
  const recId = rec.rec.id;
  const url = `https://open.spotify.com/embed/track/${recId}?theme=0`;

  return (
    <div style={{ margin: '5px 0' }}>
      <iframe
        title={recId}
        src={url}
        theme="0"
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
