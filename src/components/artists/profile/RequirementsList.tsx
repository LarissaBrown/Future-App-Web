'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  SpeakerWaveIcon,
  SwatchIcon,
  TableCellsIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Requirement {
  category: string;
  items: string[];
  icon: 'audio' | 'stage' | 'setup' | 'timing';
}

interface RequirementsListProps {
  requirements: Requirement[];
  additionalNotes?: string;
}

export default function RequirementsList({ requirements, additionalNotes }: RequirementsListProps) {
  const getIcon = (category: string) => {
    switch(category) {
      case 'audio':
        return SpeakerWaveIcon;
      case 'stage':
        return SwatchIcon;
      case 'setup':
        return TableCellsIcon;
      case 'timing':
        return ClockIcon;
      default:
        return SpeakerWaveIcon;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-2">Technical Requirements</h2>
          <p className="text-gray-600 mb-12">Everything needed for a flawless performance</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {requirements.map((req, index) => {
              const Icon = getIcon(req.icon);
              return (
                <motion.div
                  key={req.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="w-6 h-6 text-secondary mr-3" />
                    <h3 className="text-xl font-semibold text-primary">{req.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {req.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {additionalNotes && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-primary/5 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">Additional Notes</h3>
              <p className="text-gray-700">{additionalNotes}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
