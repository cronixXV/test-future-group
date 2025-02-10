import { Card, CardContent, Typography, Link } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { RepoCardProps } from "../types/type";

function RepoCard({
  name,
  description,
  html_url,
  stargazers_count,
  updated_at,
}: RepoCardProps) {
  return (
    <Card sx={{ marginBottom: 2, padding: 1, width: "280px", height: "150px" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          <Link href={html_url} target="_blank" rel="noopener noreferrer">
            {name}
          </Link>
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <StarIcon fontSize="small" color="primary" /> {stargazers_count}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Обновлено: {new Date(updated_at).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RepoCard;
