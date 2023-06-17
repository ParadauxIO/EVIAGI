import "./OrganiserIndex.scss";

export default function OrganiserIndex() {
    return (
        <main className="main index desktop-only">
            <div className="intro">
                <h1>Organisers Dashboard</h1>
                <p>
                    Welcome to EVIAGI, a place where electronic voting is undoubtably 
                    great [sic.] Here you can manage your various elections and constituencies.
                </p>

                <p>
                    If you don't know where to start, why not check out our great <a href="">Documentation</a>
                </p>
            </div>

            <div className="statistics">
                <div className="statistic">
                    <span className="key">Open Elections</span>
                    <span className="value">0</span>
                </div>

                <div className="statistic">
                    <span className="key">Completed Elections</span>
                    <span className="value">0</span>
                </div>

                <div className="statistic">
                    <span className="key">Total Ballots Cast</span>
                    <span className="value">0</span>
                </div>

                <div className="statistic">
                    <span className="key">Total Electorate</span>
                    <span className="value">0</span>
                </div>
            </div>

            <div>
                <h2>Running elections</h2>
                TODO
            </div>
        </main>
    );
}