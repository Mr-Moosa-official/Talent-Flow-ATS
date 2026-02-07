'use client';

import type { Candidate } from '@/lib/types';
import {
  parseResumeAction,
  suggestNextStepAction,
} from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bot,
  BrainCircuit,
  ClipboardList,
  GraduationCap,
  Lightbulb,
  Loader2,
  Mail,
  Phone,
  Upload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { ResumeDataExtractionOutput } from '@/ai/flows/resume-data-extraction';
import type { CandidateNextStepSuggestionOutput } from '@/ai/flows/candidate-next-step-suggestion';

interface CandidateProfileClientProps {
  candidate: Candidate;
}

export function CandidateProfileClient({
  candidate: initialCandidate,
}: CandidateProfileClientProps) {
  const { toast } = useToast();
  const [candidate, setCandidate] = useState(initialCandidate);

  // For resume parsing
  const [parseState, formAction] = useFormState(parseResumeAction, {
    data: null,
    error: null,
  });

  // For next step suggestion
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] =
    useState<CandidateNextStepSuggestionOutput | null>(null);
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);

  useEffect(() => {
    if (parseState.error) {
      toast({
        variant: 'destructive',
        title: 'Error Parsing Resume',
        description: parseState.error,
      });
    }
    if (parseState.data) {
      toast({
        title: 'Resume Parsed Successfully',
        description: 'Candidate profile has been updated with extracted data.',
      });
      const { name, email, phone, experience, skills, education } =
        parseState.data as ResumeDataExtractionOutput;
      setCandidate((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        phone: phone || prev.phone,
        experience: experience || prev.experience,
        skills: skills || prev.skills,
        education: education || prev.education,
      }));
    }
  }, [parseState, toast]);

  const handleSuggestNextStep = () => {
    startTransition(async () => {
      const { data, error } = await suggestNextStepAction({
        candidateProfile: JSON.stringify(candidate),
        pipelineStage: candidate.pipelineStage,
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error Getting Suggestion',
          description: error,
        });
      }
      if (data) {
        setSuggestion(data);
        setShowSuggestionDialog(true);
      }
    });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="lg:col-span-1 flex flex-col gap-4">
        <Card>
          <CardHeader className="items-center">
            <Avatar className="w-24 h-24 mb-2">
              <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
              <AvatarFallback className="text-3xl">
                {candidate.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{candidate.name}</CardTitle>
            <CardDescription>{candidate.appliedFor}</CardDescription>
            <Badge>{candidate.pipelineStage}</Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{candidate.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{candidate.phone}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              AI Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={formAction} className="space-y-2">
              <Label htmlFor="resume">Parse & Update from Resume</Label>
              <Input id="resume" name="resume" type="file" />
              <SubmitButton />
            </form>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSuggestNextStep}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              Suggest Next Step
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {candidate.experience.map((exp, i) => (
                <li key={i}>{exp}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {candidate.education.map((edu, i) => (
                <li key={i}>{edu}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <AlertDialog
        open={showSuggestionDialog}
        onOpenChange={setShowSuggestionDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI-Powered Next Step Suggestion</AlertDialogTitle>
            <AlertDialogDescription>
              {suggestion?.reasoning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-secondary p-4 rounded-md">
            <p className="font-semibold text-secondary-foreground">
              {suggestion?.nextStepSuggestion}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Upload className="mr-2 h-4 w-4" />
      )}
      Parse Resume
    </Button>
  );
}
