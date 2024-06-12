import { useEffect, useState } from 'react';
import request from '@/utils/request';
import ShareLink from '@/components/ShareLink';

interface Props {
  text?: string;
}

interface Link {
  url?: string;
  icon?: string;
  title?: string;
  description?: string;
}

async function getUrls(text: string): Promise<string[]> {
  const urlRegex = /(?:https?|ftp):\/\/[^\s\n]+/gi;
  const urls = text.match(urlRegex) || [];
  return urls;
}

async function fetchLinkInfo(urls: string[]): Promise<Link[]> {
  const links = await Promise.all(
    urls.map((url) =>
      request
        .get(`/common/geturlmetadata?url=${encodeURIComponent(url)}`)
        .then((data) => data.data)
        .catch(() => {
          return { url };
        }),
    ),
  );

  return links;
}

export default (props: Props) => {
  const { text = '' } = props;

  const [links, setLinks] = useState<Link[]>([]);

  const fetchLinks = async (str: string) => {
    const urls = await getUrls(str);
    setLinks(urls.map((url) => ({ url })));
    const data = await fetchLinkInfo(urls);
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks(text);
  }, [text]);

  return (
    <div>
      {links.map((link) => (
        <div key={link.url}>
          <ShareLink {...link} />
        </div>
      ))}
    </div>
  );
};
