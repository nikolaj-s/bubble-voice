import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title, description, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

export default MetaTags;
