import { Loader2, Search, Wand } from 'lucide-react';
import { useState } from 'react';

// Define types for difficulty levels
type Difficulty = 'beginner' | 'intermediate' | 'advanced';

type AICourseProps = {
  courseId?: string;
};

export function AICourse(props: AICourseProps) {
  const [keyword, setKeyword] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keyword.trim() && !isLoading) {
      onSubmit();
    }
  };

  function onSubmit() {
    if (typeof window !== 'undefined') {
      window.location.href = `/ai-tutor/search?term=${encodeURIComponent(keyword)}`;
    }
  }

  // Render the search UI
  return (
    <section className="flex flex-grow flex-col bg-gray-100">
      <div className="container mx-auto flex max-w-3xl flex-col py-12">
        <h1 className="mb-2 text-3xl font-bold">AI Course Generator</h1>
        <p className="mb-6 text-gray-600">
          Create personalized learning paths with AI
        </p>

        <div className="rounded-md border border-gray-200 bg-white p-6">
          <p className="mb-6 text-gray-600">
            Enter a keyword or topic, and our AI will create a personalized
            learning course for you.
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="flex flex-col">
              <label
                htmlFor="keyword"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Course Topic
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  id="keyword"
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Machine Learning, JavaScript, Photography"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  maxLength={50}
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {keyword.length}/50
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <div className="flex gap-2">
                {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(
                  (level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`rounded-md border px-4 py-2 capitalize ${
                        difficulty === level
                          ? 'border-gray-800 bg-gray-800 text-white'
                          : 'border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ),
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !keyword.trim()}
              className={`flex items-center justify-center ${
                isLoading || !keyword.trim()
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-black hover:bg-gray-800'
              } mt-2 rounded-md px-4 py-2 font-medium text-white transition-colors`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand size={18} className="mr-2" />
                  Generate Course
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
