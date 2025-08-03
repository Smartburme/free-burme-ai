// Define all application routes
export const routes = {
    'chat': {
        template: 'chat',
        title: 'AI Chat Bot',
        init: async () => {
            const { init } = await import('../pages/chat.js');
            init();
        }
    },
    'image': {
        template: 'image-gen',
        title: 'Image Generator',
        init: async () => {
            const { init } = await import('../pages/image-gen.js');
            init();
        }
    },
    'coder': {
        template: 'coder',
        title: 'Code Generator',
        init: async () => {
            const { init } = import('../pages/coder.js');
            init();
        }
    },
    'public-chat': {
        template: 'public-chat',
        title: 'Public Chat Groups',
        init: async () => {
            const { init } = await import('../pages/public-chat.js');
            init();
        }
    },
    'friends': {
        template: 'friends-list',
        title: 'Friends List',
        init: async () => {
            const { init } = await import('../pages/friends-list.js');
            init();
        }
    }
};
