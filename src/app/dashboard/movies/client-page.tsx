"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import { createClient } from "../../../../supabase/client";
import { FilmIcon, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  video_url: string;
  created_at: string;
};

export default function MoviesClient({
  user,
  movies,
}: {
  user: any;
  movies: Movie[];
}) {
  const { t } = useLanguage();
  const supabase = createClient();
  const router = useRouter();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
    video_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("movies").insert([formData]);

      if (error) throw error;

      setFormData({
        title: "",
        description: "",
        category: "",
        image_url: "",
        video_url: "",
      });
      setIsAddDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (!selectedMovie) return;

    try {
      const { error } = await supabase
        .from("movies")
        .delete()
        .eq("id", selectedMovie.id);

      if (error) throw error;

      setIsDeleteDialogOpen(false);
      setSelectedMovie(null);
      router.refresh();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{t("manageMovies")}</h1>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("addMovie")}
            </Button>
          </header>

          {/* Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {movie.image_url ? (
                      <img
                        src={movie.image_url}
                        alt={movie.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FilmIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">
                        {movie.title}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => {
                          setSelectedMovie(movie);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {movie.category}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{movie.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <FilmIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium">{t("noMoviesYet")}</h3>
                <p className="text-muted-foreground mt-2">
                  {t("addYourFirstMovie")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Movie Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("addNewMovie")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t("title")}</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">{t("category")}</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">{t("posterImageUrl")}</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video_url">{t("videoUrl")}</Label>
              <Input
                id="video_url"
                name="video_url"
                value={formData.video_url}
                onChange={handleInputChange}
                placeholder="https://example.com/video.mp4"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("adding") : t("addMovie")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{t("confirmDelete")}</DialogTitle>
          </DialogHeader>
          <p>
            {t("deleteMovieConfirmation")}{" "}
            <span className="font-semibold">{selectedMovie?.title}</span>?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteMovie}
            >
              {t("delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
