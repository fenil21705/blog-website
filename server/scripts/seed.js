const { User, Category, sequelize } = require('../models');

const seed = async () => {
    try {
        await sequelize.sync({ force: false });

        // Create Categories
        const categories = ['Technology', 'Lifestyle', 'Design', 'Business'];
        for (const name of categories) {
            await Category.findOrCreate({
                where: { name },
                defaults: { name, slug: name.toLowerCase() }
            });
        }

        const adminExists = await User.findOne({ where: { role: 'admin' } });
        if (!adminExists) {
            await User.create({
                username: 'admin',
                email: 'admin@blog.com',
                password: 'adminpassword',
                role: 'admin'
            });
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
