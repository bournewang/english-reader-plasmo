import React from 'react';
import readingResources from '../api/resources'
// import type { Resource } from '../api/types';

const Resources = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-8">Reading Resources</h1>
            <p className="mb-8 text-gray-600 text-lg">
            If you can&apos;t see the icon of a resource, you might can&apos;t access it in your region, try others.
            </p>
            <div className="w-full max-w-4xl">
                {Object.keys(readingResources).map((category) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1">
                            {readingResources[category].map((resource) => (
                                <a
                                    key={resource.name}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition text-center"
                                >
                                    <img src={resource.icon_url} alt={resource.name} className="h-16 mb-4 m-auto" />
                                    <h3 className="text-xl font-medium">{resource.name}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
