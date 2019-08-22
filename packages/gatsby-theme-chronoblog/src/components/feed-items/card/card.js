/** @jsx jsx */
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { jsx, Styled } from 'theme-ui';

import Date from '../../date';
import Tags from '../../tags';

/**
 * @param {'fixed' | 'fluid'} imgType
 * @param {*} frontmatter
 */
const getCover = (frontmatter, imgType) => {
  if (
    frontmatter &&
    frontmatter.cover &&
    frontmatter.cover.childImageSharp &&
    frontmatter.cover.childImageSharp[imgType] &&
    frontmatter.cover.childImageSharp[imgType] !== '' &&
    frontmatter.cover.childImageSharp[imgType] !== 0
  )
    return frontmatter.cover.childImageSharp[imgType];
  return '';
};

const CardPostCover = ({ data: { frontmatter } }) => {
  const coverFluidImage = getCover(frontmatter, 'fluid');
  return (
    <div>
      {coverFluidImage ? (
        <div
          sx={{
            border: '0px',
            borderColor: 'muted',
            borderStyle: 'solid',
            borderRadius: [0]
          }}
        >
          <BackgroundImage
            fluid={coverFluidImage}
            style={{
              backgroundSize: 'cover'
            }}
          >
            <BackgroundImage
              style={{
                backgroundSize: 'contain',
                backdropFilter: 'blur(5px)'
              }}
              fluid={coverFluidImage}
            >
              <div
                sx={{
                  minHeight: ['200px', '400px'],
                  backdropFilter: `drop-shadow(0px 0px 50px black)`,
                  boxShadow: 'inset 0px 0px 15px black',
                  borderRadius: [0]
                }}
              />
            </BackgroundImage>
          </BackgroundImage>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const getDescriptionForCard = (fromFrontmatter, fromExcerpt) => {
  if (fromFrontmatter) return fromFrontmatter;
  if (fromFrontmatter === '') return '';
  if (fromExcerpt && fromExcerpt !== '') return fromExcerpt;
  return '';
};

const LinkCard = ({ to, children }) => (
  <Link
    to={to}
    sx={{
      display: 'block',
      textDecoration: 'none',
      color: 'inherit'
    }}
  >
    {children}
  </Link>
);
export default ({ item }) => {
  //
  const description = getDescriptionForCard(
    item.frontmatter.description,
    item.excerpt
  );
  const link = item.fields.slug;
  const { date } = item.frontmatter;
  const { title } = item.frontmatter;
  const { tags } = item.frontmatter;
  //
  return (
    <article>
      <div
        sx={{
          my: '20px',
          color: 'text',
          bg: 'inherit',
          border: '2px',
          borderColor: 'muted',
          borderStyle: 'solid',
          borderRadius: [0],
          '&:hover': {
            opacity: 0.9,
            borderColor: 'secondary'
          }
        }}
      >
        <CardPostCover data={item} />
        <div sx={{ px: '20px', py: '20px' }}>
          <LinkCard to={link}>
            <Styled.h2 sx={{ mb: '8px', mt: '12px' }}>{title}</Styled.h2>
            <Date date={date} />
            <Styled.p sx={{ mb: '18px' }}>{description}</Styled.p>
          </LinkCard>
          <div sx={{ mt: '4px' }}>
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </article>
  );
};
