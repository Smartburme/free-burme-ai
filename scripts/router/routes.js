// Define all application routes
export const routes = {
    'chat': {
        template: 'chat',
        title: 'AI Chat Bot',
        styles: ['chat'],
        init: async () => {
            const { init } = await import('../pages/chat.js');
            init();
        }
    },
    'image': {
        template: 'image-gen',
        title: 'Image Generator',
        styles: ['image-gen'],
        init: async () => {
            const { init } = await import('../pages/image-gen.js');
            init();
        }
    },
    'coder': {
        template: 'coder',
        title: 'Code Generator',
        styles: ['coder'],
        init: async () => {
            const { init } = await import('../pages/coder.js');
            init();
        }
    },
    'public-chat': {
        template: 'public-chat',
        title: 'Public Chat Groups',
        styles: ['public-chat'],
        init: async () => {
            const { init } = await import('../pages/public-chat.js');
            init();
        }
    },
    'friends': {
        template: 'friends-list',
        title: 'Friends List',
        styles: ['friends-list'],
        init: async () => {
            const { init } = await import('../pages/friends-list.js');
            init();
        }
    },
    'friends-chat': {
        template: 'friends-chat',
        title: 'Friends Chat',
        styles: ['friends-chat'],
        init: async (params) => {
            const { init } = await import('../pages/friends-chat.js');
            init(params);
        }
    }
};
