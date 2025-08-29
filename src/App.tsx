import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock } from '@phosphor-icons/react'
import { textEntryCollection } from '@/lib/data'
import { toast } from 'sonner'

function App() {
  const [content, setContent] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const queryClient = useQueryClient()

  // Load existing text entry
  const { data: entries } = useQuery({
    queryKey: ['textEntries'],
    queryFn: () => textEntryCollection.getAll(),
  })

  // Get the most recent entry
  const currentEntry = entries?.[0]

  // Initialize content from stored data
  useEffect(() => {
    if (currentEntry && content === '') {
      setContent(currentEntry.content)
    }
  }, [currentEntry, content])

  // Save text entry mutation
  const saveMutation = useMutation({
    mutationFn: async (newContent: string) => {
      const now = Date.now()
      
      if (currentEntry) {
        return textEntryCollection.update(currentEntry._id, {
          content: newContent,
          updatedAt: now,
        })
      } else {
        return textEntryCollection.insert({
          content: newContent,
          createdAt: now,
          updatedAt: now,
        })
      }
    },
    onSuccess: () => {
      setSaveStatus('saved')
      queryClient.invalidateQueries({ queryKey: ['textEntries'] })
      setTimeout(() => setSaveStatus('idle'), 2000)
    },
    onError: () => {
      setSaveStatus('idle')
      toast.error('Failed to save text. Please try again.')
    }
  })

  // Auto-save functionality with debounce
  useEffect(() => {
    if (content.trim() === '') return
    
    setSaveStatus('saving')
    const timeoutId = setTimeout(() => {
      saveMutation.mutate(content)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [content]) // Remove saveMutation from dependencies

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-foreground mb-2">
            Text Keeper
          </h1>
          <p className="text-sm text-muted-foreground">
            Your thoughts, automatically saved
          </p>
        </div>

        <Card className="shadow-sm border-border">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  {saveStatus === 'saving' && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      <Clock size={12} className="mr-1" />
                      Saving...
                    </Badge>
                  )}
                  {saveStatus === 'saved' && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle size={12} className="mr-1" />
                      Saved
                    </Badge>
                  )}
                </div>
              </div>
              
              <Textarea
                id="main-text-input"
                value={content}
                onChange={handleContentChange}
                placeholder="Start writing your thoughts here..."
                className="min-h-[400px] text-base leading-relaxed resize-none border-input focus:ring-accent focus:border-accent transition-colors"
                style={{ lineHeight: '1.6' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App