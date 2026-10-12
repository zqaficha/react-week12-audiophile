import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  object-fit: contain;
  background: #f1f1f1;
  border-radius: 8px;
  display: block;
`;

type Props = { slug: string; height: number };

export default function ProductImage({ slug, height }: Props) {
  return (
    <Img src={`/images/image-${slug}.jpg`} alt={slug} style={{ height }} />
  );
}
