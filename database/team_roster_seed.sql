-- Awesome Studios: supplied 25-person roster
-- Safe to run more than once; each record is guarded by its name.

INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ukaha Terkuma', 'https://api.dicebear.com/9.x/initials/svg?seed=Ukaha%20Terkuma&backgroundColor=b78961&textColor=f5f1eb', 'C.E.O', 'Executive', 'All Rounder', 'Founding leadership and studio direction.', 1, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ukaha Terkuma');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Sen Joseph', 'https://api.dicebear.com/9.x/initials/svg?seed=Sen%20Joseph&backgroundColor=8b5e3c&textColor=f5f1eb', 'HOD. Writing', 'Writing', 'Writer', 'Writing and story development.', 2, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Sen Joseph');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Akosugh Keghtor', 'https://api.dicebear.com/9.x/initials/svg?seed=Akosugh%20Keghtor&backgroundColor=70472d&textColor=f5f1eb', 'HOD. CGI', 'CGI', 'CGI & 3D Animation', 'CGI and three-dimensional animation.', 3, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Akosugh Keghtor');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Abugh Caleb', 'https://api.dicebear.com/9.x/initials/svg?seed=Abugh%20Caleb&backgroundColor=9d6b4b&textColor=f5f1eb', 'HOD. Software', 'Software', 'Software & Web Development', 'Software systems and web development.', 4, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Abugh Caleb');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Tormough Joseph', 'https://api.dicebear.com/9.x/initials/svg?seed=Tormough%20Joseph&backgroundColor=5d4535&textColor=f5f1eb', 'HOD. Security', 'Security', 'Structure, Security & Environment', 'Structure, security, and the studio environment.', 5, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Tormough Joseph');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Yaladoo Hope', 'https://api.dicebear.com/9.x/initials/svg?seed=Yaladoo%20Hope&backgroundColor=8b5e3c&textColor=f5f1eb', 'HOD. Web Development', 'Web Development', 'Web Development', 'Web development and digital experiences.', 6, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Yaladoo Hope');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Swem Samuel', 'https://api.dicebear.com/9.x/initials/svg?seed=Swem%20Samuel&backgroundColor=b78961&textColor=f5f1eb', 'HOD. 3D Animation', '3D Animation', '3D Animation', 'Three-dimensional animation and motion work.', 7, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Swem Samuel');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ordams Alexander', 'https://api.dicebear.com/9.x/initials/svg?seed=Ordams%20Alexander&backgroundColor=70472d&textColor=f5f1eb', 'HOD. 2D Animation', '2D Animation', 'Artist & 2D Animation', 'Illustration and two-dimensional animation.', 8, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ordams Alexander');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Naswem Sefa-Ter', 'https://api.dicebear.com/9.x/initials/svg?seed=Naswem%20Sefa-Ter&backgroundColor=9d6b4b&textColor=f5f1eb', 'HOD. Press & Info', 'Press & Information', 'Writer & Storyboard', 'Writing, storyboards, press, and information.', 9, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Naswem Sefa-Ter');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ekefan Comfort', 'https://api.dicebear.com/9.x/initials/svg?seed=Ekefan%20Comfort&backgroundColor=5d4535&textColor=f5f1eb', 'HOD. Café', 'Café', 'Writer & Storyboard', 'Writing and storyboard work for the Café department.', 10, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ekefan Comfort');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Achakpa-Ikyo Kingford', 'https://api.dicebear.com/9.x/initials/svg?seed=Achakpa-Ikyo%20Kingford&backgroundColor=8b5e3c&textColor=f5f1eb', 'Secretary', 'Administration', 'Writer, Storyboard & Artist', 'Writing, storyboards, art, and studio coordination.', 11, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Achakpa-Ikyo Kingford');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Korna Glory', 'https://api.dicebear.com/9.x/initials/svg?seed=Korna%20Glory&backgroundColor=b78961&textColor=f5f1eb', 'Team member', 'Writing', 'Writer & Storyboard', 'Writing and storyboard work.', 12, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Korna Glory');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Yimam Nephertiti', 'https://api.dicebear.com/9.x/initials/svg?seed=Yimam%20Nephertiti&backgroundColor=70472d&textColor=f5f1eb', 'Team member', 'Story', 'Storyboard', 'Storyboard development.', 13, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Yimam Nephertiti');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Gbaa Iorwuese', 'https://api.dicebear.com/9.x/initials/svg?seed=Gbaa%20Iorwuese&backgroundColor=9d6b4b&textColor=f5f1eb', 'Team member', 'Art & Story', 'Artist, Writer & Storyboard', 'Visual art, writing, and storyboards.', 14, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Gbaa Iorwuese');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Tarbo Yima', 'https://api.dicebear.com/9.x/initials/svg?seed=Tarbo%20Yima&backgroundColor=5d4535&textColor=f5f1eb', 'Team member', 'Digital', 'Web Development, Software & Writing', 'Web development, software, and writing.', 15, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Tarbo Yima');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ahangba Monalisa', 'https://api.dicebear.com/9.x/initials/svg?seed=Ahangba%20Monalisa&backgroundColor=8b5e3c&textColor=f5f1eb', 'Team member', 'Writing', 'Writer & Storyboard', 'Writing and storyboard work.', 16, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ahangba Monalisa');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Tersugh Naiomi', 'https://api.dicebear.com/9.x/initials/svg?seed=Tersugh%20Naiomi&backgroundColor=b78961&textColor=f5f1eb', 'Team member', 'Digital', 'Web Development & Software Design', 'Web development and software design.', 17, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Tersugh Naiomi');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Makir Abigail', 'https://api.dicebear.com/9.x/initials/svg?seed=Makir%20Abigail&backgroundColor=70472d&textColor=f5f1eb', 'Team member', 'Story', 'Storyboard', 'Storyboard development.', 18, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Makir Abigail');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ajikwa Christopher', 'https://api.dicebear.com/9.x/initials/svg?seed=Ajikwa%20Christopher&backgroundColor=9d6b4b&textColor=f5f1eb', 'Team member', 'Art & Story', 'Artist & Storyboard', 'Visual art and storyboard work.', 19, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ajikwa Christopher');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ebube Onuorah', 'https://api.dicebear.com/9.x/initials/svg?seed=Ebube%20Onuorah&backgroundColor=5d4535&textColor=f5f1eb', 'Team member', 'Art & Animation', 'Artist & 3D Animation', 'Visual art and three-dimensional animation.', 20, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ebube Onuorah');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ephraim Agber Sooter', 'https://api.dicebear.com/9.x/initials/svg?seed=Ephraim%20Agber%20Sooter&backgroundColor=8b5e3c&textColor=f5f1eb', 'Team member', 'Digital & Story', 'Web Development & Storyboard', 'Web development and storyboard work.', 21, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ephraim Agber Sooter');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Ukuma King', 'https://api.dicebear.com/9.x/initials/svg?seed=Ukuma%20King&backgroundColor=b78961&textColor=f5f1eb', 'Team member', 'Writing', 'Writer & Storyboard', 'Writing and storyboard work.', 22, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Ukuma King');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Garba Destiny', 'https://api.dicebear.com/9.x/initials/svg?seed=Garba%20Destiny&backgroundColor=70472d&textColor=f5f1eb', 'Team member', 'Art & Story', 'Artist & Storyboard', 'Visual art and storyboard work.', 23, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Garba Destiny');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Iorzaa Nadoo', 'https://api.dicebear.com/9.x/initials/svg?seed=Iorzaa%20Nadoo&backgroundColor=9d6b4b&textColor=f5f1eb', 'Team member', 'Web Development', 'Web Development', 'Web development.', 24, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Iorzaa Nadoo');
INSERT INTO team_members (name, photoUrl, role, department, specialty, biography, displayOrder, published)
SELECT 'Amedu Ejeh', 'https://api.dicebear.com/9.x/initials/svg?seed=Amedu%20Ejeh&backgroundColor=5d4535&textColor=f5f1eb', 'Team member', 'Unassigned', 'No niche specified', 'Awesome Studios team member.', 25, 1 WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = 'Amedu Ejeh');
