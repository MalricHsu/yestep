import { useEffect } from 'react';

const Member = () => {
    useEffect(() => {
        document.title = '會員中心 | YeStep';
    }, []);
    return (
        <>
            <div className="">
                <h2>Default Input</h2>
                <input type="search" name="input" id="111" placeholder="Next Step！想要去哪裡？" />
                <button type="button" className="btn btn-primary"></button>
            </div>
            <h2 className="text-white bg-red opacity-75 px-1">
                input記得加上 form-floating <br />
                才會套用設計稿版型
            </h2>
            {/* 表單 */}
            <form>
                {/* input floating範例 */}
                <h3>Email address</h3>
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                    />
                    <label for="exampleFormControlInput1" className="form-label">
                        欄位標題 Email address
                        <span className="text-red ps-3 text-decoration-underline">
                            form-label標籤一定要在後面
                        </span>
                    </label>
                    <small id="emailHelp" class="form-text">
                        Helper text <br />
                        如果要在form-floating放標題放在外層
                    </small>
                    <small id="emailHelp" class="invalid-feedback d-block">
                        text-muted 好像用不太到 <br />
                        表單內文字可用form-text
                    </small>
                </div>
                <label for="qty" className="form-label">
                    欄位標題 <span className="text-red"></span>
                </label>

                {/* selection 範例 */}
                <div className="input-group mb-1">
                    <button className="btn btn-outline-secondary" type="button" id="btn-minus">
                        －
                    </button>
                    <input
                        type="number"
                        className="form-control text-center is-invalid"
                        id="qty"
                        value="0"
                        min="0"
                        max="10"
                    />
                    <button className="btn btn-outline-secondary" type="button" id="btn-plus">
                        ＋
                    </button>
                </div>

                <div className="invalid-feedback d-block">Helper text</div>
                <div className="valid-feedback d-block">Helper text</div>
                <div className="">
                    <label for="exampleFormControlSelect1" className="form-label">
                        Example select
                    </label>
                    <select className="form-control" id="exampleFormControlSelect1" required>
                        <option>default</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>

                {/* Default, select = on */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkDefaultOn"
                        checked
                    />
                    <label className="form-check-label" for="checkDefaultOn">
                        Default checked
                    </label>
                </div>

                {/* Default, select = off */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="checkDefaultOff"
                    />
                    <label className="form-check-label" for="checkDefaultOff">
                        Default
                    </label>
                </div>
                {/* Error, select = on */}
                <div className="form-check">
                    <input
                        className="form-check-input is-invalid"
                        type="checkbox"
                        value=""
                        id="checkDisabledOn"
                        checked
                    />
                    <label className="form-check-label" for="checkDisabledOn">
                        check box error checked
                    </label>
                </div>

                {/* Error, select = off */}
                <div className="form-check">
                    <input
                        className="form-check-input  is-invalid"
                        type="checkbox"
                        value=""
                        id="checkDisabledOff"
                    />
                    <label className="form-check-label" for="checkDisabledOff">
                        check box error
                    </label>
                </div>
                {/* Disabled, select = on */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="DisabledOn"
                        checked
                        disabled
                    />
                    <label className="form-check-label" for="DisabledOn">
                        Disabled checked
                    </label>
                </div>

                {/* Disabled, select = off */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="DisabledOff"
                        disabled
                    />
                    <label className="form-check-label" for="DisabledOff">
                        Disabled
                    </label>
                </div>
            </form>

            {/* Pagination */}
            <h2 className="mt-5">Pagination</h2>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                            &laquo;
                        </a>
                    </li>
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            3
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            &raquo;
                        </a>
                    </li>
                </ul>
            </nav>

            {/* nav, Segment*/}

            <ul class="nav nav-underline">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                        Active
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        Default
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        Default
                    </a>
                </li>
            </ul>

            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button className="nav-link active" aria-current="page" type="button">
                        Active
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" type="button">
                        Default
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" type="button">
                        Default
                    </button>
                </li>
            </ul>
        </>
    );
};

export default Member;
