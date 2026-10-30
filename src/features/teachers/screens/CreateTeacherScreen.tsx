import React from 'react';

import { ScreenPlaceholder } from '@/components/ScreenPlaceholder';
import { TeacherOnly } from '@/navigation/TeacherOnly';

export function CreateTeacherScreen() {
  return (
    <TeacherOnly>
      <ScreenPlaceholder message="Criar professor — Semana 4" />
    </TeacherOnly>
  );
}
