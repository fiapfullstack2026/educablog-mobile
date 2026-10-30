import React from 'react';

import { ScreenPlaceholder } from '@/components/ScreenPlaceholder';
import { TeacherOnly } from '@/navigation/TeacherOnly';

export function EditTeacherScreen() {
  return (
    <TeacherOnly>
      <ScreenPlaceholder message="Editar professor — Semana 4" />
    </TeacherOnly>
  );
}
