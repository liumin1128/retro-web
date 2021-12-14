const apiUrl = process.env.API_URL || '';

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <a href={`${apiUrl}/oauth/github`}>github</a>
        </li>
        <li>
          <a href={`${apiUrl}/oauth/wechat`}>wechat</a>
        </li>
      </ul>
    </div>
  );
}
